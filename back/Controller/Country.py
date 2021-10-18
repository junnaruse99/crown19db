from ../app import app
from ../Models/Country import Country
from flask import Response

@app.route("/v1/models/country/all", methods=["GET"])
def get_country_all():
    return Country.query.all()

@app.route("/v1/models/country/", methods=["POST"])
def add_country():
    try:
        country = Country('United States')
        db.session.add(me)
        db.session.commit()
        return Response(status=201)
    except:
        return Response(status=500)

@app.route("/v1/models/country/name=<countryName>", methods=["GET"])
def get_country(countryName):
    country = Country.query.filter_by(name=countryName).first_or_404(description='There is no data with {}'.format(countryName))
    return country.id