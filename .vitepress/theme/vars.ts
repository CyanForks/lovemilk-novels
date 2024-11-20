type novelName = string
type k = string

type ValueInterface = string | {
    [key: k]: ValueInterface
} | {
    [key: k]: ValueInterface
    _display: k
}

interface VarsInterface {
    [key: novelName]: {
        [key: k]: ValueInterface
    }
}

export const vars: VarsInterface = {
    '被侵蚀之后, 我获得了大模型系统': {
        world: {  // 原来世界的信息
            currency: {
                'zh-CN': '丁尼',
                _display: 'zh-CN',
            },
            hdd: 'Hollow Deep Dive'
        },
        h1: {
            name: {
                'zh-CN': '铃',
                _display: 'zh-CN',
            },
            honorific: {
                'zh-CN': '女士',
                wuu: '小姑娘',
                _display: 'zh-CN',
            },
            pron: {  // pronoun
                'zh-CN': '她',
                _display: 'zh-CN',
            },
            _display: 'name',
        },
        hz: {
            name: {
                'zh-CN': '零号空洞',
                _display: 'zh-CN',
            },
            _display: 'name',
        },
        fy: {
            name: {
                reputation: {
                    'zh-CN': '小瑞',
                    _display: 'zh-CN',
                },
                pron: {  // pronoun
                    'zh-CN': '她',
                    _display: 'zh-CN',
                },
                _display: 'reputation',
            },
            _display: 'name',
        }
    },
}