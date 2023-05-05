from flask import Flask,render_template
from eStore import Ram_eStore

app = Ram_eStore()

@app.route('/')
def hello():
 return render_template('home.html')
if __name__ == '__main__':
 app.run(host='127.0.0.1', port=8080, debug=True)