import { handler } from './main';

// Wrap to ensure any startup/runtime error is logged and returns 500
const wrapper = async (req: any, res: any) => {
  try {
    return handler(req, res);
  } catch (err) {
    // ensure error appears in Vercel function logs
    // eslint-disable-next-line no-console
    console.error('Function invocation error:', err);
    try {
      res.statusCode = 500;
      res.end('Internal Server Error');
    } catch (e) {
      // ignore
    }
  }
};

// CommonJS export required by @vercel/node runtime
module.exports = wrapper;
// keep an ES export for completeness
export default wrapper;