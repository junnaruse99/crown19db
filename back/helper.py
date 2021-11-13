"""
model: model of sql
query: query of sql
field: field to be filtered
range: list of 1 string, contains the range separated by '-'
""" 
def filter_by_range(model, query, field, range):
    assert type(range) is list
    assert len(range) == 1
    assert type(range[0]) is str
    assert '-' in range[0]

    [range1, range2] = [int(val) for val in range.split('-')]
    query.filter(getattr(model, field).in_([range1, range2]))

    return
    
def filter_by_name():
    return

def sort(model, query, _, attr_list):
    for attr in attr_list:
        if attr[0] == '-':
            attr = attr[1:]
            query = query.order_by(getattr(model, attr).desc())
        else:
            query = query.order_by(getattr(model, attr))

    return query