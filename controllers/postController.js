import { PostModel } from '../db/models/index.js';
import { controllersErrorLogger, ApiError } from '../utils/index.js';

export const postController = {
    controllerKey: 'Post',

    async getLastTags(req, res) {
        try {
            const posts = await PostModel.find().limit(5).exec();

            const tags = posts
                .map((obj) => obj.tags)
                .flat()
                .slice(0, 5);

            res.json(tags);
        } catch (err) {
            controllersErrorLogger(this.controllerKey, 'getLastTags', err);

            next(ApiError.internal('Could not get tags'));
        }
    },

    async getAll(req, res) {
        try {
            const posts = await PostModel.find().populate('user').exec();
            res.json(posts);
        } catch (err) {
            controllersErrorLogger(this.controllerKey, 'getAll', err);

            next(ApiError.internal('Could not get posts'));
        }
    },

    async getOne(req, res) {
        try {
            const postId = req.params.id;

            PostModel.findOneAndUpdate(
                {
                    _id: postId,
                },
                {
                    $inc: { viewsCount: 1 },
                },
                {
                    returnDocument: 'after',
                },
                (err, doc) => {
                    if (err) {
                        controllersErrorLogger(this.controllerKey, 'getOne PostModel', err);
                        next(ApiError.internal('Could not get post'));
                    }

                    if (!doc) {
                        next(ApiError.notFound('Post not found'));
                    }

                    res.json(doc);
                }
            ).populate('user');
        } catch (err) {
            controllersErrorLogger(this.controllerKey, 'getOne', err);

            next(ApiError.internal('Could not get post'));
        }
    },

    async remove(req, res) {
        try {
            const postId = req.params.id;

            PostModel.findOneAndDelete(
                {
                    _id: postId,
                },
                (err, doc) => {
                    if (err) {
                        controllersErrorLogger(this.controllerKey, 'remove PostModel', err);

                        next(ApiError.internal('Could not delete post'));
                    }

                    if (!doc) {
                        next(ApiError.notFound('Post not found'));
                    }

                    res.json({
                        success: true,
                    });
                }
            );
        } catch (err) {
            controllersErrorLogger(this.controllerKey, 'remove', err);

            next(ApiError.internal('Could not get the post'));
        }
    },

    async create(req, res) {
        try {
            const doc = new PostModel({
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(','),
                user: req.userId,
            });

            const post = await doc.save();

            res.json(post);
        } catch (err) {
            controllersErrorLogger(this.controllerKey, 'create', err);

            next(ApiError.internal('Could not create post'));
        }
    },

    async update(req, res) {
        try {
            const postId = req.params.id;

            await PostModel.updateOne(
                {
                    _id: postId,
                },
                {
                    title: req.body.title,
                    text: req.body.text,
                    imageUrl: req.body.imageUrl,
                    user: req.userId,
                    tags: req.body.tags.split(','),
                }
            );

            res.json({
                success: true,
            });
        } catch (err) {
            controllersErrorLogger(this.controllerKey, 'update', err);

            next(ApiError.internal('Could not update post'));
        }
    }
}
