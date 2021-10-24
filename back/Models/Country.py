import db from db

class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    gdp = db.Column(db.String(50), unique=True, nullable=False)
    populatioDensity = db.Column(db.String(50), unique=True, nullable=False)
    flag = db.Column(db.String(500), unique=True, nullable=False)
    area = db.Column(db.String(25), unique=True, nullable=False)
    capitalId = db.relationship('City', backref='country', lazy=True, uselist=False)
    latitude = db.Column(db.Float, unique=True, nullable=False)
    longitude = db.Column(db.Float, unique=True, nullable=False)

    def __repr__(self):
        return '<Country %r>' % self.name


