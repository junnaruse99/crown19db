import settings

class CountryCity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'))
    is_capital = db.Column(db.Boolean, unique=False, nullable=False)