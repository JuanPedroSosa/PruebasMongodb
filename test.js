//insertOne
//insertMany

let user2 = {
	name: "Pedro",
	last_name: "Sosa",
	correo: "pedro@sosa.com.ar"
}

let user3 = {
	name: "Ricardo",
	last_name: "Cardenes",
	correo: "ricardo@cardenes.com.ar"
}

let user4 = {
	name: "Eduardo",
	last_name: "Sabaj",
	correo: "eduardo@sabaj.com.ar"
}

db.users.insertOne(user2);
db.users.insertMany([user3, user4]);
db.users.find();
db.users.find(
	{age: 25} // criterios -> where
).pretty();
db.users.find(
	{last_name: "Sosa"}, // criterios -> where
	{name: true, correo:true, _id: false} // select
).pretty();
db.users.find(
	{last_name: "Sosa"}, // criterios -> where
	{name: false} // select
).pretty();
//$ne -> sea diferente a
db.users.find(
	{
		age: {
			$ne:25
		}
	}
).pretty();
//$eq
db.users.find(
	{
		age: {
			$eq:25
		}
	}
).pretty();
// findOne obtener el primer documento
db.users.findOne(
	{last_name: "Sosa"}
)
// esto es lo mismo
db.users.findOne()
//$gt >
db.users.find(
	{
		age: {
			$gt:20
		}
	}
).pretty();
//operadores relaciones
//$lt o lte

// operadores lógicos
//$and $or
// edad mayor 20 y menor que 30
db.users.find(
	{
		$and: [
			{
				age: {
					$gt:20
				}
			},
			{
				age: {
					$lt:30
				}
			}
		]

	}
).pretty();
//$or
db.users.find(
	{
		$or: [
			{
				name: "Pedro"
				},
			{
				name: "Ricardo"
			}
		]

	}
).pretty();
// Obtener usuario cuyo sea Pedro o Ricardo y que su edad sea mayor a 20 y menor a 30
db.users.find(
	{
		$or: [
			{
				name: "Pedro"
				},
			{
				name: "Ricardo"
			},
			{
				$and: [
					{
						age: {
							$gt:20
						}
					},
					{
						age: {
							$lt:30
						}
					}
				]
			}
		]

	}
).pretty();
// expresiones regulares
db.books.insertMany([
	{title: "Don quijote de la mancha", sales: 500},
	{title: "Historias de dos ciudades", sales: 200},
	{title: "El señor de los anillos", sales: 150},
	{title: "El principito", sales: 140},
	{title: "El hobbit", sales: 100},
	{title: "Alicia en el pais de las maravillas", sales: 100},
	{title: "El codigo Da Vinci", sales: 80},
	{title: "El alquimista", sales: 65},
]);
// cmoiencen con El - where like "El%""
db.books.find({
	title: /^El/
})
// que terminen con s - where like "%s"
db.books.find({
	title: /s$/
})
// que contenga la - where like "%la%"
db.books.find({
	title: /la/
})

// Obtener usuario cuyo sea Pedro o Ricardo (ejemplo sin $or)
// $in
// $nin
db.users.find({
		name: {
			$in: ["Pedro", "Ricardo"]
		}
})

let user5 = {
	name: "Marcelo",
	correo: "marcelo@bartolome.com.ar",
	support: true,
	createAt: new Date()
}

db.users.insertOne(user5);

// obtener usuario por atributos, en este caso los que tengan apellido
db.users.find({
	last_name: {
		$exists: true
	}
})

// obtener usuario por atributos, en este caso que contenga
// createAt y sea de tipo Date
db.users.find({
	createAt: {
		$type: "date"
	}
})

db.users.find({
	$and: [
		{
			createAt: {
				$exists: true
			}
		},
		{
			createAt: {
				$type: "date"
			}
		}
	]
})
// update -> insert si un atributo no existe lo agrega
db.users.updateMany(
	{
		support: {
			$exists: false
		}
	},
	{
		$set: {
			support: false
		}
	}
)
db.users.updateOne(
	{
		name: "Eduardo"
	},
	{
		$set: {
			support: true
		}
	}
)

// $unset elimina atributos
db.users.updateOne(
	{
		createAt: {exists: true}
	},
	{
		$unset: {createAt: true}
	}
)
// $inc _> int

// upsert -> update es para el caso no estemos seguros que el documento exista
// actualiza y si no está lo crea
db.users.updateOne(
	{
		name: "Leandro"
	},
	{
		$set: {
			support: true
		}
	},
	{
		$upsert: true
	}
)
// remove
db.users.remove(
	{
		name: "Luis"
	}
)
// drop elimina colleción
// dropDatabase elimina base de datos

// find retorna un cursor
// findOne retorna un documento
for (i=0; i < 10; i++) {
	db.demo.insert({
		name: "user" + 1
	})
}
// cantidad de reg.
db.demo.find().count();
// buscar y contar los que termine con com.ar
db.demo.find(
	{
		correo: /com.ar$/
	}
).count();
// find() -> limit(), skip(), sort()
db.users.find().limit(2);
// 1 Asc
// -1 Desc
db.users.find().sort({
	name: -1
})

// renombrar atriubuto nomenclatura camelCase (mongodb)
db.users.updateMany(
	{},
	{
		$rename: {
			last_name: "lastName"
		}
	}
)
// Listas
db.users.updateOne(
	{
		name: "Eduardo"
	},
	{
		$set: {
			courses: ["Python", "MongoDB", "Java"]
		}
	}
)

db.users.updateOne(
	{
		name: "Marcelo"
	},
	{
		$set: {
			courses: ["Git", "Nodejs", "Redes"]
		}
	}
)
// buscar los usuarios que posean los cursos Python, Java
db.users.findOne(
	{
		courses: ["Python", "MongoDB", "Java"] //lista exacta y en el mismo orden
	}
)

// $all buscan elementos dentro de listas
db.users.find(
	{
		courses: {
			$all: ["MongoDB"]
		}

	}
)

db.users.find(
	{
		courses: "MongoDB"
	}
)
// operadores relacionales para listas
db.users.updateOne(
	{
		name: "Eduardo"
	},
	{
		$set: {
			scores: [9,8,9,5,10]
		}
	}
)

db.users.updateOne(
	{
		name: "Ricardo"
	},
	{
		$set: {
			scores: [10,9,9,8,10]
		}
	}
)
// buscar usuarios que posean calificación de 10
db.users.find(
	{
		scores: 10
	}
)
// buscar los usuarios que reprobaron (6 o más para aprobar)
db.users.find(
	{
		scores: {
			$lt: 6
		}
	}
)

// insertar elementos a las listas $push pull $pop
// $push agregar elementos a una lista
db.users.updateOne(
	{
		name: "Eduardo"
	},
	{
		$push: {
			courses: "Nodejs"
		}
	}
)
// $push $each
db.users.updateOne(
	{
		name: "Eduardo"
	},
	{
		$push: {
			courses: {
				$each: ["Django", "Rails"]
			}
		}
	}
)
// $position
db.users.updateOne(
	{
		name: "Eduardo"
	},
	{
		$push: {
			courses: {
				$each: ["Base de datos"],
				$position: 0
			}
		}
	}
)
// $sort
db.users.updateOne(
	{
		name: "Eduardo"
	},
	{
		$push: {
			scores: {
				$each: [10,10],
				$sort: 1
			}
		}
	}
)
// $pull eliminar elemento de la lista
db.users.updateMany(
	{
		courses: {exists: true}
	},
	{
		$pull: {
			courses: "Python"
		}
	}
)

db.users.updateMany(
	{
		courses: {exists: true}
	},
	{
		$pull: {
			courses: {
				$in: ["Django", "Javascript"]
			}
		}
	}
)
// modificar el índice de una lista
db.users.updateMany(
	{
		scores: {exists: true}
	},
	{
		$set: {
			"scores.0": 5 // indice=0 y reemplazar por 5
		}
	}
)
// cuando no conocemos el índice
db.users.updateMany(
	{
		scores: {exists: true},
		scores: 9 // busca el 9 en la lista
	},
	{
		$set: {
			"scores.$": 6 // busca el 9 lo reemplaza por 6
		}
	}
)

// documentos slice position o index
db.users.findOne(
	{
		name: "Eduardo"
	},
	{
		_id: false,
		name: true,
		scores: {
			$slice: 1 // busca Eduardo retorna la posición 1 de scores
			//$slice: -1 // busca Eduardo retorna el último elemnento
		}
	}
)

db.users.findOne(
	{
		name: "Eduardo"
	},
	{
		_id: false,
		name: true,
		scores: {
			$slice: [0,3] // desde el índice 0 al 3

		}
	}
)
// buscar documentos por tamaño
// obtener los usuarios que tienen 5 cursos
db.users.findOne(
	{
		courses: {
			$size: 5
		}
	}
)
// obtener los usuarios que posean al menos 3 cursos
db.users.find(
	{
		$and: [
			{
				courses: {$exists: true}
			},
			{
				$where: "this.courses.length > 3" // this es el documento
			}
		]

	}
)

// relaciones
// uno a uno
let autor = {
	name: "Juan",
	age: 40,
	address: {
		street: "street",
		city: "city",
		country: "country"
	}
}
// uno a muchos
let autor = {
	name: "Juan",
	age: 40,
	libros: [
		{
			titulo: "nro 1"
		},
		{
			titulo: "nro 2"
		},
		{
			titulo: "nro 3"
		},
	]
}
// uno a muchos
// llave foranea con ObjectId

// unión de colleciones
// lookup -> relacional join left join inner join
// obtener autores con sus respectivos libros.
db.autores.aggregate(
	[
		{
			$lookup: {
				from: "libros", // nombre de la colección
				localField: "id",
				foreignField: "autor_id",
				as: "listadodeLibros"
			}
		}
	]
)
// obtener todos los autores con por lo menos un libro.
// aggregate es un framework
db.autores.aggregate(
	[
		{
			$lookup: {
				from: "libros", // nombre de la colección
				localField: "id",
				foreignField: "autor_id",
				as: "listadodeLibros"
			}
		},
		{
			$match: {
				listadodeLibros: {
					$ne: []
				}
			}
		},
		{
			$project: {
				_id: false, nombre: true
			}
		}
	]
)
// $unwind
db.autores.aggregate(
	[
		{
			$lookup: {
				from: "libros", // nombre de la colección
				localField: "id",
				foreignField: "autor_id",
				as: "listadodeLibros"
			}
		},
		{
			$unwind: "$listadodeLibros"
		},
		{
			$project: {
				_id: false,
				nombre: true,
				libro: "$listadodeLibros"
			}
		}

	]
)

// documentos anidados
db.users.updateOne(
	{
		name: "Eduardo"
	},
	{
		$set: {
			address: {
				city: "Ricardo Rojas",
				state: "Tigre",
				postalCode: 2000
			}
		}
	}
)

db.users.updateOne(
	{
		name: "Ricardo"
	},
	{
		$set: {
			address: {
				city: "Ricardo Rojas",
				state: "Tigre",
				postalCode: 1000,
				number: 1,
				street: "Calle nada",
				references: "Casa blanca"
			}
		}
	}
)
// obtener todos los usuarios que tengan una dirección
db.users.find({
	address: {$exists:true}
})
// dot notation
// obtener todos los usuarios que tengan una dirección y codigo postal 1000
db.users.find({
	"address.postalCode": 1000
})

db.users.find({
	$and: [
		{
			"address.postalCode": 1000
		},
		{
			"address.number": {exists: true}
		},
		{
			"address.number": {$gte: 10} //>= 10
 		},
	]

})
// obtener todos los usuario con codigo postal y referencias
db.users.find(
	{
	$and: [
		{
			address: {$exists: true}
		},
		{
			"address.references": {$exists: true}
		},
	]
	},
	{
		_id: false,
		name: true,
		references: true
		//"address.references": true
		//"address.references": {
		//	$slice: 1
		//}

	}
)

// elimino en todods los documentos el atributo courses
db.users.updateMany(
	{
		courses: {$exists: true}
	},
	{
		$unset: {courses: true}
	}
)

// uno (usuario) a muchos (courses lista de documentos)
db.users.updateOne(
	{
		name: "Eduardo"
	},
	{
		$set: {
			courses: [
				{
					title: "MongoDB",
					progress: 50,
					completed: false
				},
				{
					title: "Base de datos",
					progress: 100,
					completed: true
				},
				{
					title: "Git",
					progress: 100,
					completed: true
				}
			]
		}
	}
)

db.users.updateOne(
	{
		name: "Ricardo"
	},
	{
		$set: {
			courses: [
				{
					title: "MongoDB",
					progress: 50,
					completed: false
				},
				{
					title: "Python",
					progress: 100,
					completed: true
				},
				{
					title: "Ruby",
					progress: 80,
					completed: false
				}
			]
		}
	}
)
// elemMAtch atributos dentro de lista
// obtener todos los usuarios que hayan terminado al menos un curso
db.users.find(
	{
		courses: {
			$elemMatch: {
				completed: true
			}
		}
	}
)

db.users.find(
	{
		courses: {
			$elemMatch: {
				progress: {$gte: 80}
			}
		}
	}
)
// obtener el nombre del usuario junto con el título de cada uno de los cursos
db.users.find(
	{
		courses: {$exists: true}
	},
	{
		_id: false,
		name: true,
		"courses.title": true
	}
)
// modificar un documento a través del índice
db.users.updateOne(
	{
		name: "Ricardo"
	},
	{
		$set: {
			"courses.0.progress": 100,
			"courses.0.completed": true
		}
	}
)

// modificar un documento sin conocer el índice
// el indice del documento cuyo título sea igual a Docker
db.users.updateOne(
	{
		name: "Ricardo",
		"courses.title": "Docker"
	},
	{
		$set: {
			"courses.$.progress": 100,
			"courses.$.completed": true
		}
	}
)

// aggregate funciona como pipeline output -> input -> output _input
db.users.find(
	{
		age: {$gt: 25}
	}
)
db.users.aggregate(
	[
		{
			$match: {
				age: {$gt: 25}
			}
		}
	]
)

db.users.aggregate(
	[
		{
			$match: {
				age: {$gt: 25}
			}
		},
		{
			$match: {
				courses: {$exists: true}
			}
		}
	]
)

// projection
db.users.aggregate(
	[
		{
			$match: {
				age: {$gt: 25}
			}
		},
		{
			$match: {
				courses: {$exists: true}
			}
		},
		{
			$project: {
				_id: false, name: true, courses: true
			}
		}
	]
)
// $slice
db.users.aggregate(
	[
		{
			$match: {
				age: {$gt: 25}
			}
		},
		{
			$match: {
				courses: {$exists: true}
			}
		},
		{
			$project: {
				_id: false, name: true, courses: true
			}
		},
		{
			$project: {
				name: true,
				firstCourses: {
					$slice: ["$courses", 2] // obtener los dos primeros cursos
				}
			}
		}
	]
)
// arrayElemAt

db.users.aggregate(
	[
		{
			$match: {
				age: {$gt: 25}
			}
		},
		{
			$match: {
				courses: {$exists: true}
			}
		},
		{
			$project: {
				_id: false, name: true, courses: true // a = courses
			}
		},
		{ // la proyección anterior arroja dos campos (output) y es el input par esta proyección
			$project: {
				name: true,
				firstCourses: { // b
					$slice: ["$courses", 2] // obtener los dos primeros cursos $courses viene de a
				}
			}
		},
		{
			$project: {
				name: true,
				course: {
					$arrayElemAt: ["$firstCourses", 0] // obtener el primer curso $firstCourses viene de b
				}
			}
		}
	]
)

// addFields
db.users.aggregate(
	[
		{
			$match: {
				age: {$gt: 25}
			}
		},
		{
			$match: {
				courses: {$exists: true}
			}
		},
		{
			$project: {
				_id: false, name: true, courses: true // a = courses
			}
		},
		{ // la proyección anterior arroja dos campos (output) y es el input par esta proyección
			$project: {
				name: true,
				firstCourses: { // b
					$slice: ["$courses", 2] // obtener los dos primeros cursos $courses viene de a
				}
			}
		},
		{
			$project: {
				name: true,
				course: {
					$arrayElemAt: ["$firstCourses", 0] // obtener el primer curso $firstCourses viene de b
				}
			}
		},
		{
			$addFields: {
				currentDate : new Date()
			}
		}
	]
)
// $set (addFields y set agregan campos)
db.users.aggregate(
	[
		{
			$match: {
				scores: {$exists: true}
			}
		},
		{
			$project: {
				_id: false, name: true, scores: true
			}
		},
		{
			$set: {
				sum: {$sum: "$scores" } // sumar los elementos de la lista scores
			}
		}
	]
)

db.users.aggregate(
	[
		{
			$match: {
				$and: [
					{
						name: {$exists: true}
					},
					{
						last_name: {$exists: true}
					}
				]
			}
		},
		{
			$project: {
				_id: false, name: true, last_name: true
			}
		},
		{
			$project: {
				fullName: {
					$concat: ["$name", " ", "$last_name"]
				}
			}
		}
	]
)

// $group
db.items.insertMany(
	[
		{type: "Camera", color: "Red", price: 120},
		{type: "Laptop", color: "White", price: 400},
		{type: "Laptop", color: "Black", price: 600},
		{type: "Camera", color: "Silver", price: 200},
		{type: "Microphone", color: "Black", price: 200},
		{type: "Mouse", color: "White", price: 50},
		{type: "Monitor", color: "White", price: 50}
	]
)
// agrupar y contar respecto a su tipo
db.items.aggregate(
	[
		{
			$group: {
				_id: "$type",
				total: {$sum: 1}
			}
		},
		{ // Having
			$match: {
				total: {$gt: 1}
			}
		}
	]
)
// $limit y $sort. Obtener el usuario más joven
db.users.aggregate(
	[
		{
			$sort: {
				age: 1
			}
		},
		{
			$limit: 1
		}
	]
)
// $map
// multiplicar a todos los valores de la lista scores por 10
db.users.aggregate(
	[
		{
			$match: {
				scores: {$exists: true}
			}
		},
		{
			$project: {
				_id: false, name: true, scores: true
			}
		},
		{
			$project: {
				newListScores:{
					$map: {
						input: "$scores",
						as: "calificacion",
						in: {
							$multiply: ["$$calificacion", 10] //$$ indica que no esta en el output del pipeline
						}
					}
				}
			}
		}
	]
)

// crear colecciones con validadores y reglas
db.createCollection

// respaldo de información
// mongodump
// mongorestore
/*
mongodump --db curso_mongo
mongorestore --db curso_mongo dump/curso_mongo
*/
// respaldar colecciones
/*
mongodump --collection autores --db curso_mongo
mongorestore --collection autores --db curso_mongo dump/curso_mongo/autores.bson
*/

