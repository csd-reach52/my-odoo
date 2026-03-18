{
    'name': 'E2E Test Module',
    'version': '1.0',
    'depends': ['base', 'web'],
    'assets': {
        'web.assets_tests': [
            'my_test_module/static/src/js/tours/my_tour.js',
        ],
    },
    'installable': True,
}