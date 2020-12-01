import pymongo

client = pymongo.MongoClient("mongodb+srv://user2:MgvHTBzIoUG0iD8V@cluster0.2lusr.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client.truchas
user = db.user

people = ['amanda', "azlen", "athena", "bonnie", "chris", "david", "dhruvik", "dmitri", "dima", "emma", "ethan", "felipe", "geffen", "harshu", "jonathan", "kesava", "liam", "marley", "matt", "noah", "phoebe", "raffi", "santi", "steve", "taylor", "tiago", "vincent", "william"]
def setUpUser():
    user.insert_many([{'name' : n , 'tags': []} for n in people])

if __name__ == "__main__":
    setUpUser()