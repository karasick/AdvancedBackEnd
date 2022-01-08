export const jwtConstants = {
    secret: `${process.env.JWT_SECRET_KEY}` || 'Very_Str0ng_Secret_Key',
    expiresIn: '24h'
};