module.exports = (DataTypes, sequelize) => {
    const afterParties = sequelize.define(
        'afterParties',
        {
            location: DataTypes.STRING,
            city: DataTypes.STRING,
            date: DataTypes.DATE,
            ticketPrice: DataTypes.FLOAT
        },
        {
            timestamps: true
        }
    )
    return afterParties;
}