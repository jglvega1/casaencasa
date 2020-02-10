import pymongo
uri = "mongodb+srv://jglvega_r_w:Facebuke18A@registronc-qxao5.mongodb.net/test?retryWrites=true"
client = pymongo.MongoClient(uri)
mdb = client["Main"]

db = []
def renderCasa (n):
	obj = {
		"num" : 0,
		"estado" : "visitar",
		"notas" : ""
	}
	obj["num"] = n
	return obj
def renderCalle (nombre, nums):
	c = []
	for j in nums:
		for i in range(j[0],j[1],j[2]):
			c.append(renderCasa(i))
	obj = {
		"nom": nombre,
		"casas": c
	}
	return obj
def renderCuadra (num, calles):
	c = []
	for i in calles:
		#print(i[0])
		c.append(renderCalle(i[0],i[1]))
	obj = {
		"num" : num,
		"calles" : c
	}
	db.append(obj)
renderCuadra(1,[
	["Herradura",[
			[9503,9523,2],[9108,9126,2]
		]
	],
	["Hda. El Portal",[
			[9504,9530,2],[9604,9622,2]
		]
	]
])
renderCuadra(46,[
	["M. Jesús Benjarano",[
			[9102,9138,2],[9202,9236,2]
		]
	]
])
client["registroNCcasas"]["casas"].delete_many({})#cleardb
client["registroNCcasas"]["casas"].insert_many(db)