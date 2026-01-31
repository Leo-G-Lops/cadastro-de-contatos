from flask import Flask
from flask import jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

contatos = []
contador_id = 1

@app.route('/contatos', methods=['GET'])
def listar_contatos():
    return jsonify(contatos)

@app.route('/contatos', methods=['POST'])
def criar_contato():
    global contador_id

    contato = request.json

    contato['id'] = contador_id
    contador_id +=1

    contatos.append(contato)
    return jsonify(contato), 201

@app.route('/contatos/<int:id>', methods=['PUT'])
def putContato(id):
    for contato in contatos:
        if contato['id'] == id:
            contato.update(request.json)
            return jsonify(contato)
        
    return jsonify({'erro': 'Contato não encontrado'}), 404
    
@app.route('/contatos/<int:id>', methods=['DELETE'])
def excluir_contato(id):
    global contatos
    contatos = [c for c in contatos if c['id'] != id]
    return '', 204
if __name__ == '__main__':
    app.run(debug=True)