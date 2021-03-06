// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

const axios = require('axios');

export default class UsersController {
    public async store({ request, response }: HttpContextContract) {
        const input = request.only(['username','email']);

        try {
            const users = await User.create(input);

            return response.status(200).json({ code: 200, status: 'success', data: users });

        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message });
        }
    }

    public async index({ response }: HttpContextContract) {
        const users = await User.all();

        return response.status(200).json({ code: 200, status: 'success', data: users });
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const users = await User.findBy('id', params.id);

            return response.status(200).json({ code: 200, status: 'success', data: users });

        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message });
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        const input = request.only(['username','email']);

        try {
            const users = await User.findBy('id', params.id);
            users?.merge(input);

            await users?.save();
            return response.status(200).json({ code: 200, status: 'success', data: users });

        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message });
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        try {
            const users = await User.findBy('id', params.id);
            await users?.delete();
            return response.status(200).json({ code: 200, status: 'success', data: users });

        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message });
        }
    }

    public async access({ response }: HttpContextContract) {
        try {
            const payload = await axios({
                url: "https://swapi.dev/api/planets/1/",
                method: "get",
            });
            return response.status(200).json(payload.data);
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message });
        }
    }
}
