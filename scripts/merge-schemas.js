/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-04 11:32:52
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-04 11:39:24
 * @FilePath: /shareholder_graph/merge-schemas.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { print } = require('graphql');
const fs = require('fs');
const path = require('path');

// 定义 schemas 文件夹和输出文件的路径
const schemasDir = path.join(__dirname, '..', 'schemas'); // 指向项目根目录下的 schemas 文件夹
const outputFile = path.join(__dirname, '..', 'schema.graphql'); // 指向项目根目录下的 schema.graphql

async function main() {
    try {
        const typesArray = loadFilesSync(schemasDir, { extensions: ['graphql'], recursive: true });
      
        if (typesArray.length === 0) {
          console.warn(`No GraphQL schema files found in ${schemasDir}. Skipping merge.`);
          process.exit(0); // 正常退出，因为没有文件需要合并
        }
      
        // 2. 合并加载到的 Type Definitions
        const mergedTypeDefs = mergeTypeDefs(typesArray);
      
        // 3. 将合并后的 Schema 打印为字符串
        const printedSchema = print(mergedTypeDefs);
      
        // 4. 将合并后的字符串写入到根目录的 schema.graphql 文件
        fs.writeFileSync(outputFile, printedSchema);
        
        return printedSchema;
      
      } catch (error) {
        console.error('Error merging GraphQL schemas:', error);
        process.exit(1); // 错误退出
      }
}

main().then(() => {
    console.log(`Successfully merged schemas from ${schemasDir} to ${outputFile}`);
})
