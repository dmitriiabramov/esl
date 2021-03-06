module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable('views', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        }).complete(done);
    },
    down: function(migration, DataTypes, done) {
        migration.dropTable('views').complete(done);
    }
};
