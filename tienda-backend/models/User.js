const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Definicion del modelo User
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']     
    },

    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        index: true,
        validate: {
            validator: function(str) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str);
            },
            message: props => `${props.value} no es un email valido}`
        }
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    cart: {
        type: Object,
        default: {
            total: 0,
            count: 0
        }
    },

    notification: {
        type: Array,
        default: []
    },

    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
}, {minimize: false});



    UserSchema.statics.findByCredentials = async function(email, password){
        // Busca el usuario por correo electrónico en la base de datos
        const user = await User.findOne({email});

        // Si el usuario no existe, arroja un error con el mensaje "Email o contraseña incorrectos"
        if(!user) throw new Error('Email o contraseña incorrectos');

        // Utiliza bcrypt para comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const isSamePassword = bcrypt.compareSync(password, user.password);

        // Si las contraseñas coinciden, devuelve el usuario encontrado
        if(isSamePassword) return user;

        // Si las contraseñas no coinciden, arroja un error con el mensaje "Email o contraseña incorrectos"
        throw new Error('Email o contraseña incorrectos');
    }

    
    //Definición del método toJSON en el modelo UserSchema para ocultar la contraseña del usuario en la conversión a JSON
    UserSchema.methods.toJSON = function(){
        const user = this;
        const userObject = user.toObject();
        delete userObject.passwordl;
        return userObject;
    }


// Middleware para generación de hash seguro de contraseñas de usuario con bcrypt
    UserSchema.pre('save', function (next){

        const user = this;

        if(!user.isModified('password')) return next();

        bcrypt.genSalt(10, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);

                user.password = hash;
                next();
            })

        })

    })

    // Middleware de Mongoose para eliminar los pedidos de un usuario antes de eliminar el usuario
    UserSchema.pre('remove', function(next){
        this.model('Order').remove({owner: this._id}, next);
    })


const User = mongoose.model('User', UserSchema);

module.exports = User;