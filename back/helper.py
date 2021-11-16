import sqlalchemy
import traceback
from sqlalchemy.sql.expression import cast
from sqlalchemy.exc import InvalidRequestError
from psycopg2.errors import UndefinedFunction
from models import (
    Country,
    TimeZone,
    Language,
    Currency,
    City
)
"""
model: model of sql
query: query of sql
field: field to be filtered
range: list of 1 string, contains the range separated by '-'
""" 
def filter_by_range(model, query, field, range):
    assert type(range) is list
    # For now only one range is possible
    assert len(range) == 1
    assert type(range[0]) is str
    assert '-' in range[0]
    assert hasattr(model, field)

    rangeN = [int(val) for val in range[0].split('-')]
    assert len(rangeN) == 2

    condition = [getattr(model, field) >= rangeN[0], getattr(model, field) <= rangeN[1]]
    return query.filter(sqlalchemy.and_(*condition))

def filter_by_name(model, query, field, names):
    assert type(names) is list
    assert type(names[0]) is str
    
    if hasattr(model, field): # This means that the attribute is part of an object inside the model (i.e. continent for filtering cities)
        condition = [getattr(model, field) == name for name in names]
        return query.filter(sqlalchemy.or_(*condition))
    elif field == 'zone':
        names = ['UTC'+name[:3]+':'+name[3:] for name in names]
        condition = [getattr(TimeZone, 'zone') == name for name in names]
        return query.join(model.timezone, aliased=True).filter(sqlalchemy.or_(*condition))
    elif field == 'lang':
        condition = [getattr(Language, 'name') == name for name in names]
        return query.join(model.language, aliased=True).filter(sqlalchemy.or_(*condition))
    elif field == 'country':
        condition = [getattr(Country, 'officialName') == name for name in names]
        return query.join(model.country, aliased=True).filter(sqlalchemy.or_(*condition))
    else:
        # I don't know how to do this in a better way
        assert hasattr(Country, field)
        condition = [getattr(Country, field) == name for name in names]
        return query.join(model.country, aliased=True).filter(sqlalchemy.or_(*condition))
        # In case this raise an error

def sort(model, query, _, attr_list):
    stmt = []
    join_flag = False
    for attr in attr_list:
        if attr == 'country' or attr == '-country':
            join_flag = True
            if attr[0] == '-':
                attr = attr[1:]
                stmt.append(getattr(Country, 'officialName').desc())
            else:
                stmt.append(getattr(Country, 'officialName'))

        elif attr[0] == '-':
            attr = attr[1:]
            stmt.append(getattr(model, attr).desc())
        else:
            stmt.append(getattr(model, attr))

    if join_flag:
        query = query.join(model.country, aliased=True)
    
    if model is City:
        query = query.filter(getattr(model, 'population') != None)
    
    return query.order_by(*stmt)

searchable = {
    'Country' : {
        'commonName': 'string', 
        'officialName': 'string',
        'region': 'string',
        'subregion': 'string',
        'continent': 'string',
        'area': 'int',
        'latitude': 'int',
        'longitude': 'int', 
        'population': 'int',
        'language': [Language, 'name'],
        'timezone': [TimeZone, 'zone'],
        'currency': [Currency, 'name'],
        'city': [City, 'name']
    },

    'City' : {
        'name': 'string',
        'latitude': 'int',
        'longitude': 'int',
        'population': 'int',
        'country': [Country, 'officialName']
    },

    'Covid' : {
        'cases': 'int',
        'recovered': 'int',
        'deaths': 'int',
        'lastCovidCase': 'int',
        'country': [Country, 'officialName']
    }
}

def search(model, query, field, words):

    search = words[0].split()

    for word in search:
        condition = False
        for att in searchable[model.__name__]:
            if type(searchable[model.__name__][att]) == list:
                relation = searchable[model.__name__][att]

            # Check the type of relation
                try:
                    condition = sqlalchemy.or_(condition, getattr(model, att).any(getattr(*relation).ilike("%{}%".format(word))))
                except InvalidRequestError:
                    condition = sqlalchemy.or_(condition, getattr(model, att).has(getattr(*relation).ilike("%{}%".format(word))))
                except:
                    raise ValueError("I don't know what happened")
            else:
                try:
                    relation = searchable[model.__name__][att]
                    if (relation == 'string'):
                        condition = sqlalchemy.or_(condition, getattr(model, att).ilike("%{}%".format(word)))
                    else:
                        condition = sqlalchemy.or_(condition, cast(getattr(model, att), sqlalchemy.String).ilike("%{}%".format(word)))
                except:
                    raise ValueError("Upps, it appear something went wrong")

    return query.filter(condition)
