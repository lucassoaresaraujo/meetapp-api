module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('meetups', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        banner_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        return queryInterface.addConstraint('meetups', ['banner_id'], {
          type: 'foreign key',
          name: 'meetup_banner_fk',
          references: {
            table: 'files',
            field: 'id',
          },
          onDelete: 'NO ACTION',
          onUpdate: 'CASCADE',
        });
      })
      .then(() => {
        return queryInterface.addConstraint('meetups', ['user_id'], {
          type: 'foreign key',
          name: 'meetup_user_fk',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
      });
  },

  down: queryInterface => {
    return queryInterface.dropTable('meetups');
  },
};
