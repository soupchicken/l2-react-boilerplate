import Express from 'express';
import path from 'path';
const _router = Express.Router();

export default (() => {
  _router.get('/health_check', ( req, res ) => res.sendStatus( 200 ));
  _router.get(['/build*','/images*'], ( req, res) => {
    res.sendFile( path.resolve( ...req.path.split('/')))
  });
  return _router;
})
