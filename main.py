# -*- coding: utf-8 -*-

from gevent import monkey
monkey.patch_all()
from gevent.pywsgi import WSGIServer
from flask_compress import Compress
import logging

from flask import Flask, render_template, redirect, request, url_for

import os
import hashlib
app = Flask('app')

logging.basicConfig(filename='logging.log', format='%(asctime)s %(levelname)s:%(message)s', level=logging.INFO)

compress = Compress()
compress.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route(os.environ['stage1path'])
def stage1():
    return render_template('stage1.html')

@app.route(os.environ['stage2path'])
def stage2():
    return render_template('stage2.html')

@app.route(os.environ['stage3path'])
def stage3():
    q1wrong = 'q1wrong' if request.args.get('q1wrong') == 'true' else ''
    q1correct = '' if (request.args.get('q1wrong') == 'true' or not request.args.get('q2wrong') == 'true') else 'q1correct'
    q2wrong = 'q2wrong' if request.args.get('q2wrong') == 'true'  else ''
    q2correct = '' if (request.args.get('q2wrong') == 'true' or not request.args.get('q1wrong') == 'true') else 'q2correct'
    return render_template('stage3.html', q1wrong=q1wrong, q2wrong=q2wrong, q1correct=q1correct, q2correct=q2correct)
    
@app.route(os.environ['stage4path'])
def stage4():
    wrong = request.args.get('wrong')
    if wrong == 'true':
        return render_template('stage4.html', wrong='wrong')
    else:
        return render_template('stage4.html', wrong='')

@app.route(os.environ['stage5path'])
def stage5():
    return render_template('stage5.html')

@app.route(os.environ['stage6path'])
def stage6():
    wrong = request.args.get('wrong')
    if wrong == 'true':
        return render_template('stage6.html', wrong='wrong')
    else:
        return render_template('stage6.html', wrong='')

@app.route(os.environ['finalpath'])
def final():
    final_instructions = os.environ['finalinstructions'].split('*')
    for i in range(0, len(final_instructions)):
        final_instructions[i] = final_instructions[i].split('+')
        if(len(final_instructions[i]) > 1):
            final_instructions[i] = [final_instructions[i], 1]
        else:
            final_instructions[i].append(0)

    
    length = len(final_instructions)
    return render_template('final.html', final=final_instructions, length=length, link=os.environ['finallink'])

@app.route('/need-help')
def need_help():
    return render_template('need-help.html')



# route intermediate handlers
@app.route(os.environ['routehandlerpath'], methods=['POST'])
def routehandler():
    if request.method == 'POST':
        link = request.form["link"]
        return redirect('/' + str(link))
    else:
        return 'Unexpected request method for route handler: ' + str(request.method)

@app.route(os.environ['stage3handlerpath'], methods=['POST'])
def stage3handler():
    if request.method == 'POST':
        q1correct = False
        q2correct = False
        q1txt = '*'.join(request.form.getlist('q1'))
        q1givenCode = hashlib.sha3_256(q1txt.encode()).hexdigest()
        q2txt = request.form['q2txt']
        q2givenCode = hashlib.sha3_256(q2txt.encode()).hexdigest()
        if (q1givenCode == os.environ['stage3q1correctans']):
            q1correct = True
        if (q2givenCode == os.environ['stage3q2correctans']):
            q2correct = True

        if q1correct and q2correct:
            return redirect(url_for('stage4'))
        elif q1correct and not q2correct:
            return redirect(url_for('stage3', q2wrong='true'))
        elif not q1correct and q2correct:
            return redirect(url_for('stage3', q1wrong='true'))
        else:
            return redirect(url_for('stage3', q1wrong='true', q2wrong='true'))
    else:
        return 'Unexpected request method for route handler: ' + str(request.method)

@app.route(os.environ['stage4handlerpath'], methods=['POST'])
def stage4handler():
    if request.method == 'POST':
        txt = request.form["txt"]
        givenCode = hashlib.sha3_256(txt.encode()).hexdigest()
        if (givenCode == os.environ['stage4correctans1'] or givenCode == os.environ['stage4correctans2']):
            return redirect(url_for('stage5'))
        else:
            return redirect(url_for('stage4', wrong='true'))
    else:
        return 'Unexpected request method for route handler: ' + str(request.method)

@app.route(os.environ['stage6handlerpath'], methods=['POST'])
def stage6handler():
    if request.method == 'POST':
        correctCode = os.environ['stage6correctcode']
        code = str(request.form["input1"]) + str(request.form["input2"]) + str(request.form["input3"]) + str(request.form["input4"]) + str(request.form["input5"])
        givenCode = hashlib.sha3_256(code.encode()).hexdigest()
        if (correctCode == givenCode):
            return redirect(url_for('final'))
        else:
            return redirect(url_for('stage6', wrong='true'))
    else:
        return 'Unexpected request method for route handler: ' + str(request.method)


# error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(405)
def method_not_allowed(e):
    return render_template('405.html'), 405

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    if os.environ['environment'] == 'DEVELOPMENT':
        app.run(host='0.0.0.0', port=8080, debug=True)
    elif os.environ['environment'] == 'PRODUCTION':
        http_server = WSGIServer(('0.0.0.0', 8080), app)
        http_server.serve_forever()
    else:
        raise RuntimeError('Unexpected environment set: ' + os.environ['environment'])

