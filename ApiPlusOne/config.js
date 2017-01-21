module.exports = (ENV) => {
  if (ENV == 'development') {
    return {
        'ENV': ENV,
        'HOST': 'localhost',
        'USER': 'root',
        'PASSWORD': 'root',
        'DATABASE': 'plusone'
    }
  } else {
    return {
        'ENV': ENV,
        'HOST': 'localhost',
        'USER': 'root',
        'PASSWORD': 'root',
        'DATABASE': 'plusone'
    }
  }
}
