# Sample REST API For Angular Coding Test

# Description:
The API exposes 2 resources.
	- Users - For authentication
	- Products - For authenticated CRUD operations.


# Swagger Documentation for the API
http://localhost:3000/explorer
	

# How to get an Access Token from the API

API Endpoint: http://localhost:3000/api/users/login
HTTP Verb: POST
Content Type: application/json

# Payload:
	{
		"username": "mindfire",
		"password": "mindfire
	}

# Response:
{
    "id": "UqFZVcGGrTX1pXWFmAyBpenb4U1pFNn4ExE0IIvEjTl69nvyUroELBJbvErGhGi9",
    "ttl": 1209600,
    "created": "2019-01-15T11:07:06.569Z",
    "userId": 1
}

# Access Token: 
The "id" field in the above response is the Access Token to be used in the subsequent requests to other API endpoints.
Hence, the Access Token in this case will be UqFZVcGGrTX1pXWFmAyBpenb4U1pFNn4ExE0IIvEjTl69nvyUroELBJbvErGhGi9


# CRUD API Endpoints for Product Resource

The subsequent API endpoints will need Access Token to be used in the Headers. So, add the following header.
Header: x-access-token
Value: <your_access_token>
For example, 
x-access-token: UqFZVcGGrTX1pXWFmAyBpenb4U1pFNn4ExE0IIvEjTl69nvyUroELBJbvErGhGi9

GET -       http://localhost:3000/api/products
GET -       http://localhost:3000/api/products/:product_id
POST -      http://localhost:3000/api/products
PUT -       http://localhost:3000/api/products/:product_id
DELETE -    http://localhost:3000/api/products/:product_id

Example GET response
	{
        "name": "Apple iPhone X",
        "price": 7000,
        "rating": 4,
        "id": 1
    }


# How to Logout:
POST - http://localhost:3000/api/users/login
Header - x-access-token: <your_access_token>