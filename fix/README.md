# 说明

由于vite-plugin-mock很久没维护了，使用起来有不少bug。

本项目之前的使用方式是：手动修改`node_moduls`目录下`vite-plugin-mock`的源码后再打包发布

但是项目每次npm install都会将vite-plugin-mock修改之后的代码还原。

为了解决这个问题，本项目配置了`npm scripts`的`postinstall`钩子，使得每次npm install的时候将修改后的代码覆盖node_modules目录中的代码

详情请查看`package.json`文件里的`scripts`配置