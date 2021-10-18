from ../app import db

class Covid(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    countryId = db.relationship('Country', backref='covid', lazy=True), uselist=False
    cases = db.Column(db.String(), unique=True, nullable=False)
    recovered = db.Column(db.String(), unique=True, nullable=False)
    deaths = db.Column(db.String(), unique=True, nullable=False)
    lastCovidCase = db.Column(db.DateTime, unique=True, nullable=False)
    
    def __repr__(self):
        return '<Covid for country %r>' % self.countryId

class CovidInstance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    countryId = db.relationship('Country', backref='covid', lazy=True), uselist=False
    date = db.Column(db.DateTime, unique=True, nullable=False)
    totalCases = db.Column(db.String(), unique=True, nullable=False)
    totalRecovered = db.Column(db.String(), unique=True, nullable=False)
    totalDeaths = db.Column(db.String(), unique=True, nullable=False)
    
    def __repr__(self):
        return '<Covid in %r for country %r>' % (self.date, self.countryId)

