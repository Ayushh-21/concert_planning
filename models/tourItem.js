module.exports = (DataTypes, sequelize) => {
    const tourItem = sequelize.define(
        'tourItem',
        {
            tourId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                reference: { model: 'tour', key: "id" }
            },
            itemId: DataTypes.INTEGER,
            type: DataTypes.STRING
        },
        {
            timestamps: true
        }
    )

    tourItem.associate = (models) => {
        tourItem.belongsTo(models.tour, {
            foreignKey: 'tourId'
        })
    }


    return tourItem
}
