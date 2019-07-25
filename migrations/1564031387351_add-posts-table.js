exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('posts',{
		id: {type: 'serial',primaryKey:true},
		userid: {type: 'integer',notNull: true,references: '"users"'},
		content: {type: 'text'}			
  })
};

exports.down = (pgm) => {

};
