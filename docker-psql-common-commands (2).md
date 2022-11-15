<!-- prettier-ignore-start -->

## Docker and PSQL Common Commands and Where to Use Them
### Or: 'What them containers do?'

* Note: triple click a command to select the full line

# ==================== Within Root Terminal (prompt ends with $ for WSL/Linux, % for Mac) =============================
    ---DEPTH: ZERO---

*create a new container:*

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

*kill a container:*

docker kill <containerId>

*view active containers:*

docker container ls

*copy a file into a container:*

docker cp <localPathToFile> <containerId>:<containerFilePath>

*enter a container:*

docker exec -it <containerId> bash

# ==================== Within Container Terminal (prompt ends with /#) ================================================
    ---DEPTH: ONE LEVEL DEEP---

*navigate container files:*

ls, cd, etc. (Identical to root terminal file navigation commands)

*enter postgres (where your databases live):*

psql -U postgres

# ==================== Within Postgres Terminal (prompt ends with =#) =================================================
    ---DEPTH: TWO LEVELS DEEP---

*list all databases:*

\l

*switch to another database (note: you always start in the 'postgres' database, which is a generic landing spot to start with):*

\c <database>

*display all tables within current database:*

\dt

*run an sql file (note: must already be copied into container):*

\i <filepath> 

*do fancy database stuff:*

SQL COMMANDS and STUFF here ENDS with SEMI;

### ==================== FAQ: =========================================================================================

*Q* What are all those options when creating a container?

--rm : removes the container once you stop it
--name : gives the container a name
-e : establishes an environmental variable (available for the container)
-d : runs the container in a detached state (behind the scenes and not in your terminal)
-p : maps the ports <localNetwork>:<container'sPort>
-v : creates a volume for data persistance. <yourLocal>:<containerFolder>

*Q* What is the '-it' when entering a container?

-it : the i is for input, linking it to the terminal input, -t is for interactable, meaning it will react to the terminal input

*Q* What's the '-U' when entering postgres?

-U : user. The default username for docker containers is the image used. In our case, 'postgres'

*Q* Jarrett, what's your favorite movie'?!

-Blade Runner 2049 is fire, Ryan Gosling is bae

<!-- prettier-ignore-end -->
