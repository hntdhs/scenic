\echo 'Delete and recreate scenic db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE scenic;
CREATE DATABASE scenic;
\connect scenic

\i scenic-schema.sql
\i scenic-seed.sql

\echo 'Delete and recreate scenic_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE scenic_test;
CREATE DATABASE scenic_test;
\connect scenic_test

\i scenic-schema.sql
