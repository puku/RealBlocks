RealBlocks
==========
> TODO: Add Badges

This repository contains test task for RealBlocks.

This application containt only one endpoint `/posts/proximity`.  
This endpoint returns a list of blog posts that belong to users found relative to the sent coordinates within a radius of 100 km.

Run Application Locally
=======================

> Current description will not work for Windows OS based systems.

To run application you should install [Docker][1]. After you've installed docker
you can simply run following commands:

```/bin/bash
 git clone https://github.com/puku/RealBlocks.git
 cd RealBlocks
 make setup
```

After everything is set you should be able to send `POST` request to the `http://localhost:3000/posts/proximity` url.

##### Request example:
```
 curl -d '{"geo":{"lat":"-43.1234","lng":"-34.1234"}}' -H "Content-Type: application/json" -X POST http://localhost:3000/posts/proximity
```

##### Response example:
```
{  
    "data":[  
        {  
            "userId":2,
            "id":11,
            "title":"et ea vero quia laudantium autem",
            "body":"delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
        },
        ...
    ]
}
```

Run test
========
To run tests you should run following command:

```/bin/bash
 make test
```

Run linter
==========
To run tests you should run following command:

```/bin/bash
 make eslint
```

[1]: https://www.docker.com/get-started#nav-developer
