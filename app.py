from flask import Flask
from flask import render_template, g, jsonify, request
from flaskext.mysql import MySQL

app = Flask(__name__)
app.debug = True

# mysql config
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'yourusername'
app.config['MYSQL_DATABASE_PASSWORD'] = 'secret'
app.config['MYSQL_DATABASE_DB'] = 'sketch'
app.config['MYSQL_DATABASE_HOST'] = 'somethinglikethis.rds.amazonaws.com'
mysql.init_app(app)

@app.before_request
def before():
    g.db = mysql.connect()

@app.after_request
def after(response):
    g.db.close()
    return response

@app.route('/api/<table>')
def main(table):
    cursor = g.db.cursor()
    if table == "1":
        cursor.execute("select * from Student")
        title = ["student_id", "first_name", "last_name", "email", "password", "logged_status", "ta_for"]
    elif table == "2":
        cursor.execute('''SELECT a.email
FROM `sketch`.`Student` a
LEFT JOIN `sketch`.`StudentCourse` b
ON b.student_id = a.student_id
LEFT JOIN `sketch`.`Course` c
ON c.course_id = b.course_id
WHERE c.course_subject IN ('Finance', 'Math')''')
        title = ["email"]
    elif table == "3":
        cursor.execute("select * from Instructor")
        title = ["instructor_id", "course_id", "first_name", "last_name", "email", "password", "logged_status"]
    elif table == "4":
        s = request.args['query_string']
        # use s to call procedure.
        print(s)
    else:
        raise NotImplementedError

    result = cursor.fetchall()
    result_new = []
    for i in result:
        result_new.append({k:v for k,v in zip(title, i)})
    return jsonify(result_new)




if __name__ == '__main__':
    app.run()