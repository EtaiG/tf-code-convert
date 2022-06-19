define(['abc', 'foo/bar', '@org/module/src/calc', 'awesome-sauce'], function(abc, bar, calc, awesomeSauce){
    const initData = abc.doSomething()
    bar.registerAdditionalShit(z => {
        calc.multiply(initData.x, initData.y, z)
    })
    const trigger = data => bar.fireEvent('change', data)

    return {
        getAwesomeSauce: () => awesomeSauce,
        trigger
    }
})
