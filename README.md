# Visit task - Node JS server
  ## DB Schema
    create table user(
      id int not null, 
      name varchar(50) not null,
      primary key (id)
    );

    create table health_metrics(
        metric_id int not null AUTO_INCREMENT,
        user_id int not null, 
        date bigint not null,
        steps int unsigned default 0,
        calories int unsigned default 0,
        primary key (metric_id),
        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(id) 
    );
    
 ## API Endpoints: 
    ### POST- /users/save 
       - Accepts a CSV file, parses it and saves the data in db.
    ### GET- /users/
       - Returns the Health Metric data
       
 ## CRON JOB
     - command -> * * * * * cd ~/Desktop/shell_script/ && python3 script.py
     - script: [a link](https://github.com/BirlaPrasoon/visithealth/blob/main/shell_script/script.py)
