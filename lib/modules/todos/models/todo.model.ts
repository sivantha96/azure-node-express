import { model, Schema } from 'mongoose';

const todoSchema = new Schema({
    name: {
        type: String,
    },
});

export default model('todos', todoSchema);
