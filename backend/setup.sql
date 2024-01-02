CREATE TABLE category (
  category_ID int unsigned NOT NULL,
  name varchar(16) NOT NULL,
  PRIMARY KEY (`category_ID`),
  UNIQUE KEY `Category_ID_UNIQUE` (`category_ID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE day (
  day_ID int unsigned NOT NULL,
  name varchar(5) NOT NULL,
  PRIMARY KEY (`day_ID`),
  UNIQUE KEY `day_ID_UNIQUE` (`day_ID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO day (day_ID, name) values (0, 'Mo'), (1, 'Tu'), (2, 'We'), (3, 'Th'), (4, 'Fr'), (5, 'Sa'), (6, 'Su');

CREATE TABLE status (
  `status_ID` int unsigned NOT NULL,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`status_ID`),
  UNIQUE KEY `status_ID_UNIQUE` (`status_ID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO status (status_ID, name) values (0, 'Complete'), (1, 'Incomplete');

CREATE TABLE task (
  `task_ID` int unsigned NOT NULL,
  `title` varchar(32) NOT NULL,
  `description` tinytext,
  `due_date` datetime(3) NOT NULL,
  `status_ID` int unsigned NOT NULL,
  `category_ID` int unsigned NOT NULL,
  PRIMARY KEY (`task_ID`),
  UNIQUE KEY `task_ID_UNIQUE` (`task_ID`),
  KEY `status_ID_idx` (`status_ID`),
  KEY `category_ID_idx` (`category_ID`),
  CONSTRAINT `category_ID` FOREIGN KEY (`category_ID`) REFERENCES `category` (`category_ID`),
  CONSTRAINT `status_ID` FOREIGN KEY (`status_ID`) REFERENCES `status` (`status_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE task_day (
  `task_ID` int unsigned NOT NULL,
  `day_ID` int unsigned NOT NULL,
  PRIMARY KEY (`task_ID`,`day_ID`),
  UNIQUE KEY `task_ID_UNIQUE` (`task_ID`),
  UNIQUE KEY `day_ID_UNIQUE` (`day_ID`),
  CONSTRAINT `task_day_day_ID` FOREIGN KEY (`day_ID`) REFERENCES `day` (`day_ID`),
  CONSTRAINT `task_day_task_ID` FOREIGN KEY (`task_ID`) REFERENCES `task` (`task_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
