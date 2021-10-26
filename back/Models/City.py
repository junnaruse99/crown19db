class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    latitude = db.Column(db.Float, unique=True, nullable=False)
    longitude = db.Column(db.Float, unique=True, nullable=False)
    population = db.Column(db.String(50), unique=True, nullable=False)
    timeZone = db.Column(db.String(30), unique=True, nullable=False)
    countryName = db.relationship('Country', backref='city', lazy=True, uselist=False)
    cityImg = db.Column(db.String(500), unique=True, nullable=False)

    def __repr__(self):
        return '<City %r>' % self.name
