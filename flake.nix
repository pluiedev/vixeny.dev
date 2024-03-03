{
  inputs.nixpkgs.url = "nixpkgs";

  outputs = {nixpkgs, ...}: let
    systems = ["x86_64-linux"];
    forAllSystems = f: nixpkgs.lib.genAttrs systems (sys: f nixpkgs.legacyPackages.${sys});
  in {
    devShells = forAllSystems (pkgs: {
      default = pkgs.mkShell {
        packages = with pkgs; [nodejs_20 bun];
      };
    });
  };
}
