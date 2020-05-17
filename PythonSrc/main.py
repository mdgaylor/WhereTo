from UserData import *
from WhereToTypes import *
from Destination import *

mattsProfile = UserData( "Matt Gaylor", 24 )

venice = Destination( "Venice", "Italy", TravelledState.HasBeen, 0, 0, 1 )
shanghai = Destination( "Shanghai", "China", TravelledState.HasBeen, 2, 2, 1 )
lima = Destination( "Lima", "Peru", TravelledState.WantsToGo, 3, 3 )
anywhereButHere = Destination( "", "Outside of Natalie's Living Room", TravelledState.WantsToGo, 3, 3 )
georgia = Destination( "Georgia", "USA", TravelledState.WantsToGo, 3, 3 )
singapore = Destination( "", "Singapore", TravelledState.WantsToGo, 3, 3 )

mattsProfile.AddDestination( venice )
mattsProfile.AddDestination( shanghai )
mattsProfile.AddDestination( lima )
mattsProfile.AddDestination( anywhereButHere )
mattsProfile.AddDestination( georgia )
mattsProfile.AddDestination( singapore )

mattsProfile.ToString()

mattsProfile.RegisterTrip( singapore )
mattsProfile.RegisterTrip( venice )

mattsProfile.ToString()

heaven = Destination( "Nigels", "Butthole", TravelledState.WantsToGo, 3, 3, 68 )
mattsProfile.RegisterTrip( heaven )

mattsProfile.ToString()
