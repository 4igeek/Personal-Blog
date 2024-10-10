import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "That user doesn't exist" }, { status: 500 })
        }

        // Check password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "That was not a valid password" }, { status: 500 })
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create the token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: 'Login was successful',
            success: true
        })

        response.cookies.set('token', token, { httpOnly: true });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}