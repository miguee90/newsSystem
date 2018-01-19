var mongoose=require('mongoose');
var crypto=require('crypto');

var UsuarioSchema=new mongoose.Schema({
    idUsuario: Number,
	nombreCompleto: String,
	clavex: String,
	nombreUsuario: String,
	email: String,
	puesto: Number,
	activo: Boolean
},{collection : 'Usuarios'});


UsuarioSchema.pre('save', function(next) {
    if (this.clavex) {
        this.salt = new Buffer(
          crypto.randomBytes(16).toString('base64'), 
          'base64');
        this.clavex = crypto.pbkdf2Sync(
            password, this.salt, 10000, 64).toString('base64');
    }
    next();
});

UsuarioSchema.methods.validPassword = function( pwd ) {
	
	console.info(pwd);
    // EXAMPLE CODE!
    return ( this.clavex === pwd );
};

mongoose.model('Usuarios',UsuarioSchema);