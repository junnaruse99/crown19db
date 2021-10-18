from ../app import db

class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    gdp = db.Column(db.String(), unique=False, nullable=False)
    population = db.Column(db.String(), unique=False, nullable=False)
    populationDensity = db.Column(db.String(), unique=False, nullable=False)
    flag = db.Column(db.String(), unique=True, nullable=False)
    area = db.Column(db.String(), unique=False, nullable=False)
    capitalId = db.relationship('City', backref='country', lazy=True, uselist=False)
    latitude = db.Column(db.Float, unique=False, nullable=False)
    longitude = db.Column(db.Float, unique=False, nullable=False)

    def __repr__(self):
        return '<Country %r>' % self.name


    def __init__(self, name=None, gdp=None,  population=None, populationDensity=None, flag=None, area=None, capitalId=None, latitude=None, longitude=None):
        self.name = name
        self.gdp = gdp
        self.population = population
        self.populationDensity = populationDensity
        self.flag = flag
        self. area = area
        self.capitalId = capitalId
        self.latitude = latitude
        self.longitude = longitude


