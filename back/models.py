from flask import Flask
from init_db import init_db
from flask_marshmallow import Marshmallow
from marshmallow import fields
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = init_db(app)
ma = Marshmallow(app)

##### Models #####

class Country(db.Model):
    __tablename__ = 'country'

    id = db.Column(db.Integer, primary_key=True)
    commonName = db.Column(db.String(), nullable=True)
    officialName = db.Column(db.String(), nullable=True)
    region = db.Column(db.String(), nullable=True)
    subregion = db.Column(db.String(), nullable=True)
    flag = db.Column(db.String(), nullable=True)
    coatOfArms = db.Column(db.String(), nullable=True)
    maps = db.Column(db.String(), nullable=True)
    area = db.Column(db.Integer, nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    population = db.Column(db.Integer, nullable=True)
    continent = db.Column(db.String(), nullable=True)
    currency = db.relationship('Currency', backref='Country') # one to many
    language = db.relationship('Language', backref='Country') # one to many
    timezone = db.relationship('TimeZone', backref='Country') # one to many
    covid = db.relationship('Covid', backref='Country', uselist=False) # one to one
    covidInstances = db.relationship('CovidInstance', backref='Country') # one to many
    city = db.relationship('City', backref='Country', uselist=False) # One to one

    def __repr__(self):
        return '<Country %r>' % self.commonName

class Currency(db.Model):
    __tablename__ = 'currency'

    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    name = db.Column(db.String(), unique=False, nullable=False)

class Language(db.Model):
    __tablename__ = 'language'

    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    name = db.Column(db.String(), unique=False, nullable=False)

class TimeZone(db.Model):
    __tablename__ = 'time_zone'

    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    zone = db.Column(db.String(), unique=False, nullable=False)

class City(db.Model):
    __tablename__ = 'city'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=False)
    latitude = db.Column(db.Float, unique=False, nullable=False)
    longitude = db.Column(db.Float, unique=False, nullable=False)
    population = db.Column(db.Integer(), unique=False, nullable=True)
    timeZone = db.Column(db.String(), unique=False, nullable=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))

    def __repr__(self):
        return '<City %r>' % self.name

class Covid(db.Model):
    __tablename__ = 'covid'

    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    cases = db.Column(db.BIGINT, unique=False, nullable=False)
    recovered = db.Column(db.BIGINT, unique=False, nullable=False)
    deaths = db.Column(db.BIGINT, unique=False, nullable=False)
    lastCovidCase = db.Column(db.DateTime, unique=False, nullable=False)

    def __repr__(self):
        return '<Covid for country %r>' % self.countryId

class CovidInstance(db.Model):
    __tablename__ = 'covid_instance'
    
    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    date = db.Column(db.DateTime, unique=False, nullable=False)
    totalCases = db.Column(db.Integer, unique=False, nullable=False)
    totalRecovered = db.Column(db.Integer, unique=False, nullable=False)
    totalDeaths = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Covid in %r for country %r>' % (self.date, self.countryId)


#### SCHEMAS ####

class CountrySchema(ma.Schema):
    id = fields.Integer(required=True)
    commonName = fields.String(required=True)
    officialName = fields.String(required=True)
    region = fields.String(required=True)
    subregion = fields.String(required=True)
    flag = fields.String(required=True)
    coatOfArms = fields.String(required=True)
    maps = fields.String(required=True)
    area = fields.Integer(required=True)
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    population = fields.Integer(required=True)
    continent = fields.String(required=True)
    language = fields.Nested(
        'LanguageSchema',
        only=['name'],
        required=False,
        many=True
    )
    currency = fields.Nested(
        'CurrencySchema',
        only=['name'],
        required=False,
        many=True
    )
    timezone = fields.Nested(
        'TimezoneSchema',
        only=['zone'],
        required=False,
        many=True
    )
    city = fields.Nested(
        'CitySchema',
        only=['id', 'name'],
        required=False,
        many=False
    )
    class Meta:
        ordered = True

class CountrySchemaReduced(ma.Schema):
    id = fields.Integer(required=True)
    officialName = fields.String(required=True)
    continent = fields.String(required=True)
    flag = fields.String(required=True)
    area = fields.Integer(required=True)
    population = fields.Integer(required=True)

class LanguageSchema(ma.Schema):
    id = fields.Int(required=True)
    country_id = fields.Str(required=True)
    name = fields.Str(required=True)

class CurrencySchema(ma.Schema):
    id = fields.Int(required=True)
    country_id = fields.Str(required=True)
    name = fields.Str(required=True)

class TimezoneSchema(ma.Schema):
    id = fields.Int(required=True)
    country_id = fields.Str(required=True)
    zone = fields.Str(required=True)

class CitySchema(ma.Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    population = fields.Integer(required=True)
    timeZone = fields.String(required=True)
    country_id = fields.Integer(required=True)

    class Meta:
        ordered = True

class CovidSchema(ma.Schema):
    id = fields.Integer(required=True)
    country_id = fields.Integer(required=True)
    cases = fields.Integer(required=True)
    recovered = fields.Integer(required=True)
    deaths = fields.Integer(required=True)
    lastCovidCase = fields.DateTime(required=True)

    class Meta:
        ordered = True

class CovidInstanceSchema(ma.Schema):
    id = fields.Integer(required=True)
    country_id = fields.Integer(required=True)
    date = fields.DateTime(required=True)
    totalCases = fields.Integer(required=True)
    totalRecovered = fields.Integer(required=True)
    totalDeaths = fields.Integer(required=True)

    class Meta:
        ordered = True


##### Instanciating the schemas #####
country_schema = CountrySchema()
country_schema_reduced = CountrySchemaReduced()
language_schema = LanguageSchema()
currency_schema = CurrencySchema()
timezone_schema = TimezoneSchema()
city_schema = CitySchema()
covid_schema = CovidSchema()
covidInstance_schema = CovidInstanceSchema()

# Create all the databases
db.create_all()
