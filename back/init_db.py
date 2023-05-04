from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from sqlalchemy.sql import func

def init_db(app):
    load_dotenv()
    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config['SQLALCHEMY_DATABASE_URI'] =\
            'sqlite:///' + os.path.join(basedir, "db.sql")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    return SQLAlchemy(app)

    # app.config[
    #     "SQLALCHEMY_DATABASE_URI"
    # ] = os.getenv('DB_URI')
    # app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    # return SQLAlchemy(app)
