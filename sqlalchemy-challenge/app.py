from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, desc
import numpy as np


engine = create_engine("sqlite:///Resources/hawaii.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)
app = Flask(__name__)

measurement = Base.classes.measurement
Station = Base.classes.station


@app.route("/")
def welcome():
	return(
		f"Available Routes: <br/>"\
		f"/api/v1.0/precipitation <br/>"\
		f"/api/v1.0/stations <br/>"\
		f"/api/v1.0/tobs <br/>"\
		f"/api/v1.0/"\
	
	)

@app.route("/api/v1.0/precipitation")
def precipitation():
	session = Session(engine)

	results = session.query(measurement.date, measurement.prcp).filter(measurement.date > '2016-08-23').order_by(measurement.date).all()
	session.close()


	prcp_data = list(np.ravel(results))

	return jsonify(prcp_data)

@app.route("/api/v1.0/stations")
def stations():

	session = Session(engine)

	station_id = session.query(measurement.station).group_by(measurement.station).all()

	session.close()

	stations = list(np.ravel(station_id))
	return jsonify(stations)

@app.route("/api/v1.0/tobs")
def tobs():
	session = Session(engine)

	temp = session.query(measurement.station,measurement.tobs, measurement.date).filter(measurement.date > '2016-08-22').order_by(measurement.date).all()
	session.close()

	tob = list(np.ravel(temp))
	return jsonify(temp)

@app.route("/api/v1.0/<start_date>")
def start(start_date):



	session = Session(engine)    
    
	starts = session.query(func.min(measurement.tobs), func.avg(measurement.tobs), func.max(measurement.tobs)).filter(measurement.date >= start_date).all()
	
	session.close()

	date_start = list(np.ravel(starts))

	return jsonify(date_start)

@app.route("/api/v1.0/<start_date>/<end_date>")
def startend(start_date, end_date):



	session = Session(engine)    
    
	start_end = session.query(func.min(measurement.tobs), func.avg(measurement.tobs), func.max(measurement.tobs)).filter(measurement.date >= start_date).filter(measurement.date <= end_date).all()
	
	session.close()

	end_start = list(np.ravel(start_end))

	return jsonify(end_start)

@app.route("/api/v1.0/")
def index():

	return"If you want the minimum temp, the average temp, and the max temp for a given start date use /api/v1.0/'start_date'. If you to want use a start date\
	and an end date use /api/v1.0/'start_date'/'end_date. MAKE SURE YOU PUT QUOTATIONS AROUND YOUR SELECTED DATES.  The most current date in this api is '2017-08-23'."



if __name__ == "__main__":
	app.run(debug = True)
