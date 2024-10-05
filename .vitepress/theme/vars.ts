type novelName = string
type keyName = string

interface VarsInterface {
    [key: novelName]: {
        [key: keyName]: any
    }
}

export const vars: VarsInterface = {
    'Unamed01': {
        'hero01': {
            'name': 'Hero 01',
        }
    }
}