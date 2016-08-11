import * as fs from "fs";
import * as path from "path";

// SETUP ENVIRONMENT FOR MAIN PROCESS
export const rmConfig : RmConfig = (() => {
  const pkg : any = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));
  return {
    getEnvironment: () : 'development' | 'production' => {
      return pkg.env.name.toLowerCase();
    }
  };
})();