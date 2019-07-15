module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('user_subscriptions', {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        meetup_id: {
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
          allowNull: true,
        },
      })
      .then(() => {
        return queryInterface.addConstraint(
          'user_subscriptions',
          ['user_id', 'meetup_id'],
          {
            type: 'primary key',
            name: 'subscriptions_pk',
          }
        );
      })
      .then(() => {
        return queryInterface.addConstraint(
          'user_subscriptions',
          ['meetup_id'],
          {
            type: 'foreign key',
            name: 'subscription_meetup_fkey',
            references: {
              table: 'meetups',
              field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
          }
        );
      })
      .then(() => {
        return queryInterface.addConstraint('user_subscriptions', ['user_id'], {
          type: 'foreign key',
          name: 'subscription_user_fkey',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      });
  },

  down: queryInterface => {
    return queryInterface.dropTable('user_subscriptions');
  },
};
