const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
                isEven(value){
                    if(value < 1 || value > 5){
                        throw new Error('Debe colocar una dificultad entre 1 y 5')
                    }
                }
                
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 24,
                isEven(value){
                    if(value < 1 || value > 5){
                        throw new Error('Debe colocar una duración entre 1 y 24')
                    }
                }
            },
            defaultValue: 0
        },
        season: {
            type: DataTypes.ARRAY(DataTypes.ENUM('Verano', 'Primavera', 'Otoño', 'Invierno'))
        }
    });
};