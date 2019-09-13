import os
import csv
import math


csvpath = 'budget_data.csv'

with open(csvpath,newline = '') as csvfile:
	
	csvreader = csv.reader(csvfile, delimiter = ',')

	csv_header = next(csvreader)
	# print(csv_header)

	#FINDING THE TOTAL PROFITS
	profit = []
	data = []
	dates = []
	for row in csvreader:
		Date = row[0]
		Cost = float(row[1])
		data.append([Date, Cost])
		dates.append([Date])
		profit.append(Cost)
	
	total = sum(profit)

	#FINDING THE TOTAL MONTHS 
	Total_Date = int(len(data))

	
	diff = [j-i for i , j in zip(profit[:-1], profit[1:])]
	


	#AVERAGE CHANGE 
	average_change = sum(diff) / int(len(diff))

	diff.insert(0,0)
	combined_list = []
	for a,b in zip(dates,diff):
		comb = (b,a)
		combined_list.append(comb)
	
	#THIS IS FOR THE LAST SECTION OF THE H0OMEWORK 

	# new_list =list(zip(dates, diff))

	# print(new_list)
	
	
	maxx = max(combined_list)
	minn = min(combined_list)
	
		
	print('Financial Analysis')
	print('__________________________________________________________________')
	print("Total Months:",Total_Date)
	print("total:$",total)
	print("Average Change: $", average_change)
	print("Greatest Increase in Profits:", maxx)
	print("Greatest Decrease in Profits:", minn)
	
	