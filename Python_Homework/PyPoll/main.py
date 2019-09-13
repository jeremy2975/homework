import os 
import csv
import math

csvpath = 'election_data.csv'

with open(csvpath,newline ='') as csvfile: 
	csvreader = csv.reader(csvfile, delimiter = ',')
	csv_header = next(csvreader)

	print("Election Results")
	print('_______________________________________')

	#total votes
	ballot = []
	for row in csvreader:
		ID = row[0]
		County = row[1]
		Candidate = row[2]
		ballot.append([Candidate])

	Total = len(ballot)

	print("Total Votes:",len(ballot))

	print("_______________________________________")

	Khan = ballot.count(['Khan'])
	Khan_percentage = (Khan / Total)*100
	print("Khan:" +str(math.ceil(Khan_percentage))+"%" + " (" +  str(Khan) + ")")

	Correy = ballot.count(['Correy'])
	Correy_percentage = (Correy / Total)*100
	print("Correy:" +str(math.ceil(Correy_percentage))+"%" + " (" +  str(Correy) + ")")

	Li = ballot.count(['Li'])
	Li_percentage = (Li / Total)*100
	print("Li:" +str(math.ceil(Li_percentage))+"%" + " (" +  str(Li) + ")")
	
	Tooley = ballot.count(["O'Tooley"])
	Tooley_percentage = (Tooley / Total)*100
	print("O'Tooley:" +str(math.ceil(Tooley_percentage))+"%" + " (" +  str(Tooley) + ")")

	print("_______________________________________")

	Candidates = [Khan, Li, Correy, Tooley]
	winner = max(Candidates)
	if winner == Li:
		print("Winner: Li")
	elif winner == Correy:
		print("Winner: Correy")
	elif winner == Tooley:
		print("Winner: O'Tooley")
	else:
		print("Winner: Khan")

	print("_______________________________________")
	

