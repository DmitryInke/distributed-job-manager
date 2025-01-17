const { execSync } = require('child_process');
const isWindows = process.platform === 'win32';

const command = isWindows
  ? 'protoc --plugin=..\\\\..\\\\..\\\\..\\\\node_modules\\\\.bin\\\\protoc-gen-ts_proto.cmd --ts_proto_out=./types .\\\\proto\\\\*.proto --ts_proto_opt=nestJs=true --ts_proto_opt=exportCommonSymbols=false'
  : 'protoc --plugin=../../../../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./types ./proto/*.proto --ts_proto_opt=nestJs=true --ts_proto_opt=exportCommonSymbols=false';

try {
  execSync(command, { stdio: 'inherit' });
  console.log('Protobuf files generated successfully!');
} catch (error) {
  console.error('Error generating Protobuf files:', error);
  process.exit(1);
}
