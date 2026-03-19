import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import prisma from '../lib/prisma';
import env from '../config/env';

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface LoginDto {
  email: string;
  password: string;
}

const SELECTED_FIELDS = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  createdAt: true,
};

const signToken = (user: { id: number; email: string; role: Role }) =>
  jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_SECRET, {
    expiresIn: '7d',
  });

export const register = async (dto: RegisterDto) => {
  const existing = await prisma.user.findUnique({ where: { email: dto.email } });
  if (existing) throw new Error('EMAIL_TAKEN');

  const hashed = await bcrypt.hash(dto.password, 12);
  const user = await prisma.user.create({
    data: { ...dto, password: hashed },
    select: SELECTED_FIELDS,
  });

  return { user, token: signToken(user) };
};

export const login = async (dto: LoginDto) => {
  const user = await prisma.user.findUnique({
    where: { email: dto.email },
    select: { ...SELECTED_FIELDS, password: true },
  });

  if (!user) throw new Error('INVALID_CREDENTIALS');

  const valid = await bcrypt.compare(dto.password, user.password);
  if (!valid) throw new Error('INVALID_CREDENTIALS');

  const { password: _password, ...safeUser } = user;
  return { user: safeUser, token: signToken(user) };
};
